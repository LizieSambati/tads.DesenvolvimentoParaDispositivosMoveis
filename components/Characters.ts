
import alien1 from "assets/images/alien-gangster-chefao.png";
import alien2 from "assets/images/alien-gangster-estiloso.png";
import alien3 from "assets/images/alien-gangster-chapado.png";
import alien4 from "assets/images/alien-gangster-dancarino.png";

import alien1notselected from "assets/images/alien-gangster-chefao - notselected.png";
import alien2notselected from "assets/images/alien-gangster-estiloso - notselected.png";
import alien3notselected from "assets/images/alien-gangster-chapado - notselected.png";
import alien4notselected from "assets/images/alien-gangster-dancarino - notselected.png";

import alien1face from "assets/images/alien-gangster-chefao - face.png";
import alien2face from "assets/images/alien-gangster-estiloso - face.png";
import alien3face from "assets/images/alien-gangster-chapado - face.png";
import alien4face from "assets/images/alien-gangster-dancarino - face.png";


interface Character {
    charactere: any;
    images: {
        [key: string]: any;
    };
}

export const characters: Character[] = [
    {
        charactere: alien1,
        images: {
            dead: alien1face,
            critical: alien1face,
            verySad: alien1face,
            sad: alien1face,
            ok: alien1face,
            good: alien1face,
            veryGood: alien1face,
            selected: alien1,
            notSelected: alien1notselected,
        },
    },

    {
        charactere: alien2,
        images: {
            dead: alien2face,
            critical: alien2face,
            verySad: alien2face,
            sad: alien2face,
            ok: alien2face,
            good: alien2face,
            veryGood: alien2face,
            selected: alien2,
            notSelected: alien2notselected,
        },
    },

    {
        charactere: alien3,
        images: {
            dead: alien3face,
            critical: alien3face,
            verySad: alien3face,
            sad: alien3face,
            ok: alien3face,
            good: alien3face,
            veryGood: alien3face,
            selected: alien3,
            notSelected: alien3notselected,
        },
    },

    {
        charactere: alien4,
        images: {
            dead: alien4face,
            critical: alien4face,
            verySad: alien4face,
            sad: alien4face,
            ok: alien4face,
            good: alien4face,
            veryGood: alien4face,
            selected: alien4,
            notSelected: alien4notselected,
        },
    },
];
