// store.ts
import { reactive } from 'vue';

export const state = reactive({
    items: [
        { id: 1, name: 'Acceptation', srcImg: 'acceptance.png', description: 'Le besoin d\'être reconnu et accepté par les autres, de se sentir inclus dans le groupe', elo: 1000, shownCount: 0 },
        { id: 2, name: 'Curiosité', srcImg: 'curiosity.png', description: 'L\'envie d\'apprendre de nouvelles choses, d\'explorer et de comprendre le monde qui nous entoure', elo: 1000, shownCount: 0 },
        { id: 3, name: 'Indépendance', srcImg: 'independance.png', description: 'Représente le désir de prendre des décisions autonomes et d\'avoir un contrôle sur le travail et sa vie', elo: 1000, shownCount: 0 },
        { id: 4, name: 'Statut', srcImg: 'status.png', description: 'L\'importance accordée à la position sociale et au prestige dans l\'organisation', elo: 1000, shownCount: 0 },
        { id: 5, name: 'Objectif', srcImg: 'goal.png', description: 'Incarne la quête d\'un objectif significatif et aligné avec les valeurs personnelles', elo: 1000, shownCount: 0 },
        { id: 6, name: 'Honneur', srcImg: 'honor.png', description: 'Représente la fierté d\'avoir ses valeurs personnelles qui se reflètent dans la manière de travailler', elo: 1000, shownCount: 0 },
        { id: 7, name: 'Maitrise', srcImg: 'mastery.png', description: 'Reflète le besoin de développer de nouvelles compétences et de relever des défis', elo: 1000, shownCount: 0 },
        { id: 8, name: 'Ordre', srcImg: 'order.png', description: 'Incarne le besoin d\'avoir des structures et des processus clairs', elo: 1000, shownCount: 0 },
        { id: 9, name: 'Pouvoir', srcImg: 'power.png', description: 'L\'aspiration à influencer les autres, à avoir un impact et à prendre des décisions qui comptent', elo: 1000, shownCount: 0 },
        { id: 10, name: 'Relations', srcImg: 'relatedness.png', description: 'Met en avant l\'importance des interactions positives avec les collègues et les partenaires', elo: 1000, shownCount: 0 },
    ]
});
