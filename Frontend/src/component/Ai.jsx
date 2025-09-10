import React, { useState } from 'react'
import ai from "../assets/ai.png"
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

function Ai() {
    const navigate = useNavigate();
    const [isListening, setIsListening] = useState(false);

    const speak = (message) => {
        const utterance = new SpeechSynthesisUtterance(message);
        window.speechSynthesis.speak(utterance);
    }

    const startListening = () => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        
        if (!SpeechRecognition) {
            toast.error("Speech recognition not supported in this browser");
            return;
        }

        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'en-US';

        recognition.onstart = () => {
            setIsListening(true);
            speak("Listening...");
        }

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript.toLowerCase().trim();
            console.log('Heard:', transcript);
            setIsListening(false);
            
            if (transcript.includes("home")) {
                navigate("/");
                speak("Navigating to Home");
            } else if (transcript.includes("about")) {
                navigate("/about");
                speak("Navigating to About");
            } else if (transcript.includes("contact")) {
                navigate("/contact");
                speak("Navigating to Contact");
            } else if (transcript.includes("products")) {
                navigate("/products");
                speak("Navigating to Products");
            } else if (transcript.includes("cart")) {
                navigate("/cart");
                speak("Navigating to Cart");
            } else if (transcript.includes("collection")) {
                navigate("/collection");
                speak("Navigating to Collection");
            } else {
                console.log('Command not recognized:', transcript);
                toast.error(`Command not recognized: ${transcript}`);
                speak("Sorry, I didn't understand that command.");
            }
        }

        recognition.onerror = (event) => {
            setIsListening(false);
            toast.error("Speech recognition error");
            speak("Sorry, there was an error with speech recognition.");
        }

        recognition.onend = () => {
            setIsListening(false);
        }

        recognition.start();
    }

  return (
    <div className='fixed lg:bottom-[20px] md:bottom-[40px] bottom-[80px] left-[2%]' onClick={startListening}>
        <img 
            src={ai} 
            alt="AI Assistant" 
            className={`w-[100px] cursor-pointer transition-all duration-300 ${
                isListening 
                    ? 'scale-110 shadow-lg shadow-blue-500/50 animate-pulse' 
                    : 'hover:scale-105'
            }`}
        />
    </div>
  )
}

export default Ai