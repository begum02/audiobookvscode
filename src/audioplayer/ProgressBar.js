import { useEffect, useRef, useState } from "react"

export default function ProgressBar({
    style,
    currentTime,
    duration,
    audioRef,
    progress,
    setCurrentTime,
    setDuration,
    setProgress,
}) {
    const progressBarRef = useRef(null)

    const [isDragging, setIsDragging] = useState(false)

    // progress durumunu currentTime ve duration ile senkronize et
    useEffect(() => {
        const audio = audioRef.current
        if (audio) {
            const updateTime = () => {
                setCurrentTime(audio.currentTime) // Sesin anlık zamanını güncelle
                setProgress((audio.currentTime / audio.duration) * 100) // Progress bar'ı güncelle
            }

            const updateDuration = () => {
                setDuration(audio.duration) // Sesin toplam süresini güncelle
            }

            audio.addEventListener("timeupdate", updateTime)
            audio.addEventListener("loadedmetadata", updateDuration)

            return () => {
                audio.removeEventListener("timeupdate", updateTime) // Temizlik yap
                audio.removeEventListener("loadedmetadata", updateDuration)
            }
        }
    }, [])

    const handleProgressChange = (event) => {
        const newTime = (event.target.value / 100) * duration // Yeni zaman değerini hesapla
        audioRef.current.currentTime = newTime // Sesin zamanını ayarla
        setProgress(event.target.value) // Progress bar'ı güncelle
    }

    const updateProgressBar = (e) => {
        if (!progressBarRef.current) return

        const rect = progressBarRef.current.getBoundingClientRect()
        const offsetX = e.clientX - rect.left
        const newProgress = Math.max(0, Math.min(1, offsetX / rect.width)) // 0-1 arası sınırlama
        setProgress(newProgress * 100) // Yüzde olarak güncelle

        // Audio'nun currentTime değerini güncelle
        const audio = audioRef.current
        if (audio) {
            audio.currentTime = newProgress * audio.duration
        }
    }

    const handleMouseDown = (e) => {
        setIsDragging(true)
        updateProgressBar(e)
    }

    const handleMouseMove = (e) => {
        if (isDragging) {
            updateProgressBar(e)
        }
    }

    const handleMouseUp = () => {
        setIsDragging(false)
    }

    useEffect(() => {
        // Global mouse hareketlerini dinle
        document.addEventListener("mousemove", handleMouseMove)
        document.addEventListener("mouseup", handleMouseUp)

        return () => {
            // Temizleme event listener
            document.removeEventListener("mousemove", handleMouseMove)
            document.removeEventListener("mouseup", handleMouseUp)
        }
    }, [isDragging])

    const styles = {
        progressBar: {
            width: "30vw",
            height: "6px",
            backgroundColor: "#e0e0e0",
            borderRadius: "10px",
            paddingTop: "100",
            ...style,
            cursor: "pointer",
        },
        progressBarFill: {
            height: "100%",
            backgroundColor: "#00abc5",
            borderRadius: "10px",
            transition: "width 0.1s ease",
            width: `${progress}%`, // progress değerini kullanarak genişlik ayarla
        },
        container: {
            position: "relative", // Container'ın konumunu göreceli yapıyoruz
            width: "100%", // Genişlik ayarı
            height: "100px", // Yükseklik ayarı (ihtiyaca göre düzenlenebilir)

            boxShadow: "rgba(0, 0, 0, 0.08) 0px -2px 2px 0px",
            padding: "20px",
        },
        progressBarContainer: {
            position: "absolute", // Absolute position kullanıyoruz
            bottom: "30px", // Container'ın altına 30px uzaklık
            left: "0", // Sol tarafa hizalama
            right: "0", // Sağ tarafa hizalama
            padding: "0 20px", // Yanlarda padding
        },
    }

    return (
        <div
            style={styles.progressBar}
            ref={progressBarRef}
            onMouseDown={handleMouseDown}
        >
            <div style={styles.progressBarFill}></div>
        </div>
    )
}
