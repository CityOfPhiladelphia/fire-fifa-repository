import React from "react";

export default function GIS() {
    return (
        <div>
            <h1>GIS</h1>
            <p>Geospatial information systems and mapping resources.</p>

            <iframe
                title="Philadelphia GIS Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6121.57239770897!2d-75.17017412342143!3d39.90141887152719!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c6c7a9e03add31%3A0xf4050036d4293709!2sLincoln%20Financial%20Field!5e0!3m2!1sen!2sus!4v1768571521707!5m2!1sen!2sus"
                width="800"
                height="600"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
        </div>
    );
}
