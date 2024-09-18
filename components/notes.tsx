import { useState } from "react";

export default function Notes() {
    const [notes, setNotes] = useState([
        { key: '1', head: 'Headrxdtcyhvgbjknkpm,ldkecijuhaikn1', body: 'body1' },
        { key: '2', head: 'Head2', body: 'body2srdfcvhgbjnkvfcdrstrxdvgbhnhgfdtrstcyfhvhvyvtrfgvbgfgvhgbhhbhhb' },
        { key: '3', head: 'Head2', body: 'body2srdfcvhgbjnkvfcdrstrxdvgbhnhgfdtrstcyfhvhvyvtrfgvbgfgvhgbhhbhhb' },
        { key: '4', head: 'Head4', body: 'body4' },
        { key: '5', head: 'Head5', body: 'body5' },
        { key: '6', head: 'Head6', body: 'body6' },
        { key: '7', head: 'Head7', body: 'body7' },

    ]);

    return notes;
}