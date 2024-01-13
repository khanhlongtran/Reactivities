export interface Duck {
    name: string,
    numLegs: number,
    makeSound: (sound: string) => void;
}

const duck1 = {
    name: "khanh",
    numLegs: 2,
    makeSound: (sound: string) => console.log(sound)
}

const duck2 = {
    name: "long",
    numLegs: 2,
    makeSound: (sound: string) => console.log(sound)
}

duck1.makeSound('sound')
duck2.makeSound('quack')

export const ducks = [duck1, duck2]

