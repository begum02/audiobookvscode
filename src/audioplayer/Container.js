
import React, { useEffect, useRef, useState } from "react"
import TogglePlaylist from "./TogglePlayList"
import PlayPause from "./PlayPause"
import ProgressBar from "./ProgressBar"
import VolumeBar from "./VolumeBar"
import Forward from "./Forward"
import Backward from "./Backward"


export default function Container(props) {
    // This is a React component containing an Example component
    // Replace <Example /> with your own code
    const audioRef = useRef(null)
    const [duration, setDuration] = useState(0) // Sesin toplam süresi
    const [isPlaying, setIsPlaying] = useState(false) // Oynatma durumu
    const [currentTime, setCurrentTime] = useState(0) // Oynatılma zamanını takip et
    const [progress, setProgress] = useState(0)
    // Audio'nun süresi ve anlık zamanını güncelleme
    useEffect(() => {
        const audio = audioRef.current
        if (audio) {
            const updateTime = () => {
                setCurrentTime(audio.currentTime) // Sesin anlık oynatma zamanını güncelle
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
    // Play/Pause işlevi
    const togglePlayPause = () => {
        const audio = audioRef.current
        if (audio) {
            if (audio.paused) {
                audio.play() // Eğer çalıyorsa başlat
            } else {
                audio.pause() // Eğer duraklattıysa duraklat
            }
            setIsPlaying(!audio.paused) // Durumu değiştir
        }
    }
    function skipBack() {
        const audio = audioRef.current
        if (audio.currentTime - 10 > 0) {
            audio.currentTime -= 10
        } else {
            audio.currentTime = 0
        }
    }
    // İleri sarma işlevi
    const skipAhead = () => {
        const audio = audioRef.current
        if (audio) {
            let newTime = audio.currentTime + 10
            if (newTime < audio.duration) {
                audio.currentTime = newTime
            } else {
                audio.currentTime = audio.duration // Sesin sonuna git
            }
            setCurrentTime(audio.currentTime) // State güncellemesi
        }
    }
    const formatTime = (time) => {
        const minutes = Math.floor(time / 60)
        const seconds = Math.floor(time % 60)
        return `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`
    }

    const formatDuration = (time) => {
        const minutes = Math.floor(time / 60)
        const seconds = Math.floor(time % 60)
        return `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`
    }

    return (
        <div style={containerStyle.container}>
            <audio
                ref={audioRef}
                id="audio"
                src="https://yqvcqxjtzyzkgwznoeht.supabase.co/storage/v1/object/public/audiofiles/audio/46050870.mp3?t=2024-12-06T18%3A03%3A07.963Z"
            />
            <div style={containerStyle.imageandplus}>
            <img
    src="https://reactjs.org/logo-og.png"
    style={containerStyle.img}
    alt="React logo"
/>


                <TogglePlaylist style={containerStyle.TogglePlaylist} />
                <h3 style={{ position: "relative" }}>Seyahatname</h3>
            </div>
            <div style={containerStyle.skipplayprogress}>
                <div style={containerStyle.skipandplay}>
                    <Backward onClick={skipBack} />
                    <PlayPause
                        style={containerStyle.PlayPause}
                        onClick={togglePlayPause}
                        isPlaying={isPlaying}
                    />
                    <Forward onClick={skipAhead} />
                </div>
                <div style={containerStyle.progresscurrent}>
                    <span>{formatTime(currentTime)}</span>

                    <ProgressBar
                        audioRef={audioRef}
                        currentTime={currentTime}
                        setCurrentTime={setCurrentTime}
                        setDuration={setDuration}
                        setProgress={setProgress}
                        duration={duration}
                        progress={progress}
                    />
                    <span>{formatDuration(duration)}</span>
                </div>
            </div>
            <VolumeBar audioRef={audioRef} style={containerStyle.volumeBar} />
        </div>
    )
}

// Styles are written in object syntax
// Learn more: https://reactjs.org/docs/dom-elements.html#style
const containerStyle = {
    container: {
        backgroundColor: "#FFFFFF",
        boxShadow: "rgba(0, 0, 0, 0.08) 0px -2px 2px 0px",
        width: "100vw",
        height: "104px",
        paddingLeft: "20px",
        display: "flex", // Flexbox kullanımı
        // Yatay ortalama
        justifyContent: "start",
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 10
       
       
        
        


        
    },
    img: {
        width: "60px",
        height: "60px",
        marginRight: "20px",
        bottom: "20px",
    },
    TogglePlaylist: {},
    progressBar: {
        position: "absolute", // Container içinde konumlandırma
        bottom: "25px", // Container'ın altına 30px uzaklık
        // Sol taraftan biraz uzaklık
    },
    PlayPause: {},
    imageandplus: {
        display: "flex",

        flexDirection: "row",
        alignItems: "center",
        gap: "10px",
    },
    skipandplay: {
        width: "30vw", // Genişlik

        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between", // Ortalamayı sağlıyoruz
        alignItems: "center", // Dikeyde ortalama
        marginBottom: "20px", // Altta boşluk bırakmak
    },
    skipplayprogress: {
        display: "flex",
        flexDirection: "column", // Yatay yerine dikey hizalama
        justifyContent: "center", // Yüksekliği ortalamak
        alignItems: "center", // Yatayda ortalamak
        marginLeft: "200px",
        marginRight: "auto",
    },
    progresscurrent: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        gap: "10px",
    },
    volumeBar: {
        marginRight: "100px",
        marginBottom: "16px",
    },
}
