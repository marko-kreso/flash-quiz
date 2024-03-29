import Alpine from 'alpinejs';
import QuizCard from './card.js'
import { Shuffle } from './card.js';


Alpine.data(
    "util", ()=>({
        CreateCards: QuizCard.CreateCards,
        ReadCsv: QuizCard.ReadCsv,
        Shuffle: Shuffle,
    })
)


Alpine.start()