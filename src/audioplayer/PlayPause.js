

export default function PlayPause({ onClick, style, isPlaying }) {
    return (
        <div style={styles.container}>
            <div onClick={onClick} style={styles.button}>
                {isPlaying ? (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="40px"
                        viewBox="0 -960 960 960"
                        width="40px"
                        fill="#3eb1c8"
                        style={style}
                    >
                        <path d="M556.67-200v-560h170v560h-170Zm-323.34 0v-560h170v560h-170Z" />
                    </svg>
                ) : (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="40px"
                        viewBox="0 -960 960 960"
                        width="40px"
                        style={style}
                        fill="#3eb1c8"
                    >
                        <path d="M320-202v-560l440 280-440 280Z" />
                    </svg>
                )}
            </div>
        </div>
    )
}

const styles = {
    container: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    button: {
        width: "50px",
        height: "50px",
        cursor: "pointer",
    },
}
