import React, { Fragment, useState, useEffect } from "react"
import './flagGame.css'

const FlagGame = (props) => {
    const [Flag, setFlag] = useState([{
        flag: null,
        titulo: null,
    }])
    const [AFlag, setAFlag] = useState(0)
    const [puntaje, setPuntaje] = useState(0)

    useEffect(() => {
        const obtenerAFlag = () => {
            fetch("https://countriesnow.space/api/v0.1/countries/flag/images")
                .then(res => res.json())
                .then(res => {
                    const updatedFlag = res.data.map(e => ({
                        flag: e.flag,
                        nombre: e.name.toUpperCase()
                    }))
                    setFlag(updatedFlag)
                })
        }
        obtenerAFlag()
    }, [])
    useEffect(()=>{
        setAFlag(Math.floor(Math.random() * Flag.length))
    }, [Flag])

    const handleSubmit = (e) => {
        e.preventDefault()
        if (Flag[AFlag].nombre === document.getElementsByName("pais")[0].value.toUpperCase()) {
            document.getElementsByName("pais")[0].value = ''
            setAFlag(Math.floor(Math.random() * Flag.length))
            setPuntaje((e) => e + 10)
            console.log("correcto")
            console.log(document.getElementsByName("pais")[0].value)
        }
        else {
            document.getElementsByName("pais")[0].value = ''
            setPuntaje((e) => e -1)
            console.log("incorrecto")
            console.log(document.getElementsByName("pais")[0].value)
        }
    }
    
    return (
        <>
            <h1>Bienvenido a Flag Game</h1>
            <h2>A que país pertenece esta bandera?</h2>
            <form onSubmit={handleSubmit}>
                <div><img src={Flag[AFlag].flag} alt={Flag[AFlag].nombre}/></div>
                <input type="text" name="pais" className="u-full-width" placeholder={Flag[AFlag].nombre} />
                <button type="submit" className="u-full-width button-primary">Submit</button>
                <h3>Tu puntaje es: {puntaje}</h3>
            </form>
        </>
    )
}

export default FlagGame