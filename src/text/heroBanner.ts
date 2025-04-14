export type SalesPageFormat = {
    title: string,
    promise?: string,
    problem?: string,

    story?: string,
    commonSolutions?: string,
    reframing?: string,

    vision?: string,
    presentation?: string,
    benefits?: string,
    
    proof?: string,
    
    price?: string,
    callToAction?: string
}

export type SalesPageFormatTemplate = {
    title: "Catch the user's attention with a short title.",
    promise: "Make the user want to read more.",
    problem: "Describe the problem, the knife in the wound. It must create an emotional response.",

    story: "Allow the user to identify with the brand.",
    commonSolutions: "Describe the common solutions and why they do not work.",
    reframing: "Change the perceptive of the problem.",

    vision: "Describe the ideal vision, imagine if the problem did not exist.",
    presentation: "Present the product, the new solution to solve the problem.",
    benefits: "List the benefits of the product. What are the perks that the user gets, not only the characteristics of the product.",
    
    proof: "Proof of the product's effectiveness. Write testimonials of clients and they solved their problem.",

    price?: `Write the 3 prices of the product. 
    The highest price is displayed first. Add bonuses to increase the perceived value. Write everything, the price
    the reductions flat, and the percentage. Suggest to pay with doses. Write the exact price, with decimals.`,

    callToAction: "Ask the user to take action, what are the next steps. It must be simple, urgent, concise, direct and irresistible."
}

export const heroBannerTextChoices: SalesPageFormat[] = [{
    title: "Live an unforgettable experience",
    promise: "Discover the best places to visit in the world and create unforgettable memories.",

    callToAction: `Choose your day`
}, 
{
    title: "Vivez une expérience maritime inoubliable",
    promise: `Découvrez les merveilles cachées de la Méditerranée avec les bateaux électriques Marius & Coco de 2 à 22 places.
    Capitaine Coco est votre guide pour des excursions maritimes uniques à bord de nos voiliers traditionnels électriques.
    Plongez dans l'histoire et la beauté naturelle de la région en embarquant pour des sorties en mer inoubliables.`,
    callToAction: `Choose your day`
}, 
{
    title: "Make every moment unforgettable",
    promise: `Come to have an unforgettable experience`,
    callToAction: `Choose your day`
},
]