"use server"
import { createAI, createStreamableUI, createStreamableValue, StreamableValue } from 'ai/rsc'
import {UserContent} from "ai"
import {createOpenAI} from "@ai-sdk/openai"
import StreamableSkeletion from '@/components/admin/cars/StreamableSkeletion';
const openai = createOpenAI({
	apiKey: process.env.OPENAI_API_KEY,
	compatibility: "strict",
});

type ServerMessage = {
    id?: number
    name?: undefined | string, 
    role: "user" | "assistant" | "system",
    content: UserContent;

}

export async function generateCar(
    image: string
): Promise<ClientMessage |null>{
    const uiStream  = createStreamableUI()
    const valueStream = createStreamableValue<any>()

    let car = {image}
    uiStream.update(<StreamableSkeletion {...car} />)
    return null
}

export type ClientMessage = {
    id: number
    
    role: "user" | "assistant",
    display: React.ReactNode;
    car: StreamableValue<any>
}
export const AI = createAI({
    initialUIState: [],
    initialAIState: [] as ServerMessage[],
    actions: {
        generateCar
    }
})