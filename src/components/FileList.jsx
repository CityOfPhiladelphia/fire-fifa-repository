import React, { useEffect, useState } from "react";

const USER = "CityOfPhiladelphia";
const REPO = "fire-fifa-repository";
const API = `https://api.github.com/repos/${USER}/${REPO}/contents/`;

const TAG_RULES = {
    ICS: "command",
    MAP: "maps",
    EVAC: "evacuation",
    PLAN: "planning",
    OPS: "operations",
    MED: "medical",
    LOG: "logistics",
    TRAIN: "training"
};

export default function FileList() {
    const [categories, setCategories] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        async function loadRepo() {
            const root = await fetch(API).then(r => r.json());
            const folders = await Promise.all(
                root.filter(f => f.type === "dir").map(async folder => {
                    const files = await fetch(folder.url).then(r => r.json());
                    return { name: folder.name, files };
                })
            );
            setCategories(folders);
        }
        loadRepo();
    }, []);

    const getTags = (name) =>
        Object.keys(TAG_RULES)
            .filter(k => name.toUpperCase().includes(k))
            .map(k => TAG_RULES[k]);

    return (
        <>
            <input
                className="search"
                placeholder="Search documents..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            {categories.map(cat => (
                <div key={cat.name} className="category">
                    <div className="catHeader" onClick={(e) => {
                        const el = e.currentTarget.nextElementSibling;
                        el.style.display = el.style.display === "none" ? "block" : "none";
                    }}>
                        <h2>{cat.name}</h2>
                        <span>▼</span>
                    </div>
                    <div style={{ display: "block" }}>
                        {cat.files
                            .filter(f => f.type === "file" && f.name.toLowerCase().includes(search.toLowerCase()))
                            .map(f => (
                                <div key={f.name} className="file">
                                    <div>
                                        <a href={f.html_url} target="_blank">{f.name}</a>
                                        <div className="tags">{getTags(f.name).map(t => <span key={t}>{t}</span>)}</div>
                                    </div>
                                    <a href={f.download_url} download>⬇</a>
                                </div>
                            ))}
                    </div>
                </div>
            ))}
        </>
    );
}
