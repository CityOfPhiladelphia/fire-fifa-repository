import React, { useEffect, useState } from "react";
import { h } from "gridjs";
import { Grid } from "gridjs-react";
import "gridjs/dist/theme/mermaid.css";

export default function Maps() {
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/maps.json")
            .then(res => res.json())
            .then(data => {
                setFiles(data);
                setLoading(false);
            });
    }, []);

    const gridData = files.map(f => {
        const ext = f.name.split(".").pop().toUpperCase();
        const viewUrl =
            ext === "PDF"
                ? `https://docs.google.com/gview?url=${encodeURIComponent(f.url)}&embedded=false`
                : f.url;

        return [
            h(
                "button",
                {
                    style: {
                        width: "100%",
                        height: "100%",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        padding: "10px",
                        textAlign: "left",
                        fontSize: "16px"
                    },
                    onClick: () => window.open(viewUrl, "_blank")
                },
                f.name
            ),
            h(
                "a",
                {
                    style: {
                        display: "inline-block",
                        width: "100%",
                        height: "100%",
                        textAlign: "center",
                        fontWeight: "bold",
                        textDecoration: "none",
                        padding: "10px 0",
                        borderRadius: "5px",
                        cursor: "pointer",
                        color: "black"
                    },
                    href: f.url,
                    download: f.name,
                    target: "_blank",
                    rel: "noopener noreferrer"
                },
                "Download"
            )
        ];
    });

    return (
        <div
            style={{
                maxWidth: "1800px",
                margin: "50px auto",
                padding: "30px 40px",
                fontFamily: "'Segoe UI', sans-serif",
                background: "#fff",
                borderRadius: "10px",
                boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)"
            }}
        >
            <h1
                style={{
                    fontSize: "32px",
                    marginBottom: "25px",
                    color: "#2c3e50"
                }}
            >
                Maps Document Library
            </h1>
            {loading ? (
                <p>Loading files...</p>
            ) : (
                <Grid
                    data={gridData}
                    columns={[
                        { name: "File Name" },
                        { name: "Actions" }
                    ]}
                    search={true}
                    pagination={{ enabled: true, limit: 20 }}
                />
            )}
        </div>
    );
}
