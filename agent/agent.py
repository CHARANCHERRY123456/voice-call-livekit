from livekit import agents
from livekit.agents import Agent , JobContext , AgentSession
from livekit.plugins import openai , google
from dotenv import load_dotenv
load_dotenv()
import asyncio
import json
import os


class MyAgent(Agent):
    def __init__(self):
        super().__init__(
            instructions="You are a helpful AI assistant."
        )


async def publish_message(ctx: JobContext, message: dict):
    await ctx.room.local_participant.publish_data(
        json.dumps(message).encode("utf-8"),
    )

async def entrypoint(ctx: JobContext):

    print(f"Starting agent for room: {ctx.room.name}")

    await ctx.connect()

    agent = MyAgent()
    session = AgentSession(
                stt=openai.STT(model="whisper-1"),
                llm=openai.LLM(model="gpt-4o-mini"),
                tts=openai.TTS(model="gpt-4o-mini-tts"),
            )
    
    @session.on("user_input_transcribed")
    def on_user(event):
        print(f"User said: {event}")
        asyncio.create_task(publish_message(
            ctx , 
            {
                "type" : "user_input_transcribed",
                "role" : "user",
                "text" : event.transcript
            }
        ))

    @session.on("conversation_item_added")
    def on_message(event):
        print(f"Message added: {event}")
        # publish to fronted
        
        if event.item.type != "message":
            return
        
        asyncio.create_task(
            publish_message(
                ctx , 
                {
                    "type" : "conversation_item_added",
                    "role" : event.item.role,
                    "text" : event.item.content[0]
                }
            )
        )


    @session.on("agent_state_changed")
    def on_state(event):
        print(f"Agent state changed: {event}")

        asyncio.create_task(
            publish_message(
                ctx , 
                {
                    "type" : "agent_state_changed",
                    "state" : event.new_state
                }
            )
        )

    await session.start(room=ctx.room , agent=agent)
    # await session.say("Hello! I am your AI assistant. How can I help you today?")



    await session.generate_reply(
        instructions="Greet the user and introduce yourself."
    )

    print(f"Agent connected to LiveKit server")


if __name__ == "__main__":
    agents.cli.run_app(
        agents.WorkerOptions(
            entrypoint_fnc=entrypoint
        )
    )
