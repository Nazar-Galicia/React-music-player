import {nanoid} from "nanoid";
import {useEffect, useState} from "react";

interface Line {
    id: string,
    speedY: number,
    brightness: number,
    line: string,
    fontSize: number,
    spX: number,
    spY: number,
}

export const useMusicBackground = () => {
    const strokes: string[] = [
        "I’m running through the midnight rain",
        "Trying to find my way back home",
        "Every street still knows your name",
        "But I keep walking on my own",
        "The city lights are fading slow",
        "And all the stars are out tonight",
        "I hear your voice inside the radio",
        "Like a memory I cannot hide",
        "We used to dance beneath the neon",
        "Until the morning came around",
        "Now every song keeps playing on",
        "But I don't hear the same old sound",
        "I keep your picture in my mind",
        "Even though the colors fade",
        "Maybe we were never meant to find",
        "The promises we made",
        "Take me somewhere far away",
        "Where nobody knows our names",
        "We could disappear today",
        "And leave behind the flames",
        "I feel the thunder in my chest",
        "Every time you come around",
        "Maybe leaving would be best",
        "But I can't put you down",
        "The night is young, the road is clear",
        "We're chasing something undefined",
        "I wish that you were standing here",
        "With your hand inside of mine",
        "Don't let the moment disappear",
        "Don't let the silence win",
        "I know the ending isn't near",
        "So let the story begin",
        "We could watch the sunrise glow",
        "From a rooftop in the sky",
        "There's nowhere else I want to go",
        "There's no reason left to hide",
        "Your shadow follows every step",
        "Your echo fills the room",
        "I still remember every breath",
        "I still remember you",
        "Maybe time will change the view",
        "Maybe I'll forget your face",
        "But every road still leads to you",
        "No matter what I chase",
        "I see your eyes across the crowd",
        "I feel your heartbeat next to mine",
        "Even when the music's loud",
        "Everything just falls in line",
        "We were young and out of control",
        "We had nothing left to lose",
        "You were dancing with my soul",
        "And I was falling into you",
        "Now the summer's almost gone",
        "Leaves are falling from the trees",
        "I keep waiting for the dawn",
        "I keep wishing you were here with me",
        "There's a fire in the dark",
        "There's a spark beneath the blue",
        "I can feel it in my heart",
        "Every time I think of you",
        "Turn the speakers up tonight",
        "Let the whole world fade away",
        "We don't need another sign",
        "We just need another day",
        "I can hear the ocean calling",
        "From somewhere beyond the shore",
        "Every time I start falling",
        "I just want a little more",
        "Maybe we're a shooting star",
        "Burning brighter as we fall",
        "Maybe we were never far",
        "Maybe we were meant to have it all",
        "Keep me close until the morning",
        "Keep me safe beneath the moon",
        "I don't care about tomorrow",
        "I just want to stay with you",
        "Every heartbeat tells a story",
        "Every scar becomes a song",
        "Maybe all our broken pieces",
        "Were just waiting all along",
        "I don't need another reason",
        "I don't need another sign",
        "If you're standing here beside me",
        "Everything will be alright",
        "Let the rain fall on our shoulders",
        "Let the night become our home",
        "We don't have to grow much older",
        "We don't have to be alone",
        "When the morning starts to shine",
        "I'll remember where we were",
        "You were always on my mind",
        "And I was always waiting there",
        "So if you hear this melody",
        "Remember everything we knew",
        "Somewhere underneath the city",
        "I'll still be looking for you"
    ];

    const createLine = (firstLines: boolean = false): Line => {

        return {
            id: nanoid(),
            speedY: Math.random() * 2 + 1.5,
            brightness: +(Math.random() * 0.8 + 0.5).toFixed(2),
            line: strokes[Math.floor(Math.random() * strokes.length)],
            fontSize: Math.floor(Math.random() * (36 - 16 + 1)) + 16,
            spX: Math.random() * window.innerWidth,
            spY: firstLines ? Math.random() * window.innerHeight : -75,
        };
    }

    const [exitLine, setExitLine] = useState<string | null>(null);
    const [lines, setLines] = useState<Line[]>(Array.from({ length: 30 }, () => createLine(true)));

    useEffect(() => {
        const timer = setInterval(() => {
            setLines(prev => [...prev, createLine()]);
        }, 1000)

        return () => clearInterval(timer)
    })

    useEffect(() => {
        setLines(prev => prev.filter(line => line.id !== exitLine));
    }, [exitLine]);

    return {
        lines,
        setExitLine,
    }
}