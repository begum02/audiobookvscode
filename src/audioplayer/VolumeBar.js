import { useRef, useState, useEffect } from "react"

export default function VolumeBar({ audioRef, style }) {
    const volumeBarRef = useRef(null)
    const [isDragging, setIsDragging] = useState(false)
    const [volume, setVolume] = useState(1) // Başlangıçta ses seviyesi %100
    const [muted, setMuted] = useState(false) // Başlangıçta ses açılmış

    // Ses seviyesini güncelleyen fonksiyon
    const updateVolumeBar = (e) => {
        if (!volumeBarRef.current) return

        const rect = volumeBarRef.current.getBoundingClientRect()
        const offsetX = e.clientX - rect.left
        const newVolume = Math.max(0, Math.min(1, offsetX / rect.width)) // 0-1 arası sınırlama
        setVolume(newVolume)

        if (audioRef.current) {
            audioRef.current.volume = newVolume // Audio'nun ses seviyesini güncelle
            if (newVolume === 0) {
                setMuted(true) // Ses seviyesi 0'a düşerse, mute durumunu aktif et
            } else {
                setMuted(false) // Ses seviyesi 0'ın dışına çıkarsa, mute'yi kapat
            }
        }
    }

    // Mouse tıklaması ile başlatma
    const handleMouseDown = (e) => {
        setIsDragging(true)
        updateVolumeBar(e) // İlk konumu hemen güncelle
    }

    // Mouse hareketi ile güncelleme
    const handleMouseMove = (e) => {
        if (isDragging) {
            updateVolumeBar(e) // Eğer sürükleniyorsa, güncellemeye devam et
        }
    }

    // Mouse tıklaması ile sürüklemeyi sonlandırma
    const handleMouseUp = () => {
        setIsDragging(false) // Mouse bıraktığında sürüklemeyi sonlandır
    }

    // Mute açma/kapama fonksiyonu
    const toggleMute = () => {
        const audio = audioRef.current
        if (audio) {
            if (muted) {
                setMuted(false)
                audio.volume = volume // Ses açılınca mevcut seviyeyi geri yükle
            } else {
                setMuted(true)
                audio.volume = 0 // Mute olduğunda sesi sıfırla
            }
        }
    }

    useEffect(() => {
        document.addEventListener("mousemove", handleMouseMove)
        document.addEventListener("mouseup", handleMouseUp)

        return () => {
            document.removeEventListener("mousemove", handleMouseMove)
            document.removeEventListener("mouseup", handleMouseUp)
        }
    }, [isDragging])

    // Stil ayarları
    const styles = {
        volumeBar: {
            width: "150px", // Bar uzunluğunu buradan değiştirebilirsiniz
            height: "6px",
            backgroundColor: "#e0e0e0",
            borderRadius: "10px",
            cursor: "pointer",
            // Kullanıcıdan gelen ekstra stiller
        },
        volumeBarFill: {
            height: "100%",
            backgroundColor: "#00abc5",
            borderRadius: "10px",
            transition: "width 0.1s ease",
            width: `${muted ? 0 : volume * 100}%`, // Mute durumunda bar sıfırlanacak
        },
        volumeBarandIcon: {
            display: "flex",
            flexDirection: "row",
            width: "200px",
            gap: "10px",
            alignItems: "center",
            ...style,
        },
    }

    return (
        <div style={styles.volumeBarandIcon}>
            <div
                onClick={toggleMute}
                style={{ position: "relative", top: "3px" }}
            >
                {muted ? (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="30"
                        viewBox="0 -960 960 960"
                        width="30"
                        fill="#3eb1c8"
                    >
                        <path d="m616-320-56-56 104-104-104-104 56-56 104 104 104-104 56 56-104 104 104 104-56 56-104-104-104 104Zm-496-40v-240h160l200-200v640L280-360H120Z" />
                    </svg>
                ) : (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="30"
                        viewBox="0 -960 960 960"
                        width="30"
                        fill="#3eb1c8"
                    >
                        <path d="M560-131v-82q90-26 145-100t55-168q0-94-55-168T560-749v-82q124 28 202 125.5T840-481q0 127-78 224.5T560-131ZM120-360v-240h160l200-200v640L280-360H120Zm440 40v-322q47 22 73.5 66t26.5 96q0 51-26.5 94.5T560-320Z" />
                    </svg>
                )}
            </div>

            <div
                style={styles.volumeBar}
                ref={volumeBarRef}
                onMouseDown={handleMouseDown}
            >
                <div style={styles.volumeBarFill}></div>
            </div>
        </div>
    )
}
