from livekit import agents
from livekit.agents import Agent , JobContext , AgentSession
from livekit.plugins import openai , google
from dotenv import load_dotenv
load_dotenv()

import os


class MyAgent(Agent):
    def __init__(self):
        super().__init__(
            instructions="You are a helpful AI assistant."
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
