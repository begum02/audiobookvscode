import React, { useState } from "react"

export default function StarRating({
    initialRating = 0,
    count = 5,
    size = 24,
}) {
    const [rating, setRating] = useState(initialRating)
    const [hover, setHover] = useState(null)

    const StarIcon = ({ filled }) => (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            height={size}
            viewBox="0 -960 960 960"
            width={size}
            fill={filled ? "#3eb1c8" : "#e4e5e9"}
            style={{ cursor: "pointer", transition: "fill 200ms" }}
        >
            <path d="m233-120 65-281L80-590l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z" />
        </svg>
    )

    return (
        <div className="star-container" style={{ display: "flex", gap: "8px" }}>
            {[...Array(count)].map((_, index) => {
                const ratingValue = index + 1

                return (
                    <div
                        key={index}
                        onMouseEnter={() => setHover(ratingValue)}
                        onMouseLeave={() => setHover(null)}
                        onClick={() => setRating(ratingValue)}
                        style={{ cursor: "pointer" }}
                    >
                        <StarIcon filled={ratingValue <= (hover || rating)} />
                    </div>
                )
            })}
        </div>
    )
}
