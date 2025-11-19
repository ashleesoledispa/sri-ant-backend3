import React, { useState } from "react";

function App() {
    const [email, setEmail] = useState("");
    const [ruc, setRuc] = useState("");
    const [placa, setPlaca] = useState("");
    const [resultado, setResultado] = useState(null);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setResultado(null);

        try {
            const url = `http://localhost:8080/api/consulta?email=${email}&ruc=${ruc}&placa=${placa}`;
            const response = await fetch(url);
            const data = await response.json();

            if (!data.ok) {
                setError(data.mensaje || "Error en la consulta");
            } else {
                setResultado({
                    ...data,
                    datosContribuyente: JSON.parse(data.datosContribuyente),
                    vehiculo: JSON.parse(data.vehiculo)
                });
            }
        } catch (err) {
            setError("No se pudo conectar con el backend.");
        }
    };

    return (
        <div style={styles.page}>
            <div style={styles.header}>
                <h1 style={styles.headerText}>Consulta de Datos – SRI & ANT</h1>
            </div>

            <div style={styles.card}>
                <h2 style={styles.title}>Datos del Contribuyente</h2>

                {error && <div style={styles.error}>{error}</div>}

                <form onSubmit={handleSubmit} style={styles.form}>
                    <label style={styles.label}>Email</label>
                    <input
                        style={styles.input}
                        type="email"
                        placeholder="tunombre@ejemplo.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <label style={styles.label}>Cédula / RUC</label>
                    <input
                        style={styles.input}
                        type="text"
                        placeholder="Ej: 1768152560001"
                        value={ruc}
                        onChange={(e) => setRuc(e.target.value)}
                    />

                    <label style={styles.label}>Placa del vehículo</label>
                    <input
                        style={styles.input}
                        type="text"
                        placeholder="Ej: ABC1234"
                        value={placa}
                        onChange={(e) => setPlaca(e.target.value)}
                    />

                    <button style={styles.button}>Consultar</button>
                </form>

                {resultado && (
                    <div style={styles.resultsArea}>
                        <h2 style={styles.subtitle}>Resultado</h2>

                        {/* CONTRIBUYENTE */}
                        <div style={styles.section}>
                            <h3 style={styles.sectionTitle}>Datos del Contribuyente (SRI)</h3>
                            <p><b>RUC:</b> {resultado.ruc}</p>
                            <p><b>Razón Social:</b> {resultado.datosContribuyente[0].razonSocial}</p>
                            <p><b>Estado:</b> {resultado.datosContribuyente[0].estadoContribuyenteRuc}</p>
                            <p><b>Actividad Económica:</b> {resultado.datosContribuyente[0].actividadEconomicaPrincipal}</p>
                            <p><b>Tipo:</b> {resultado.datosContribuyente[0].tipoContribuyente}</p>
                        </div>

                        {/* VEHÍCULO */}
                        <div style={styles.section}>
                            <h3 style={styles.sectionTitle}>Datos del Vehículo</h3>
                            <p><b>Placa:</b> {resultado.vehiculo.numeroPlaca}</p>
                            <p><b>Marca:</b> {resultado.vehiculo.descripcionMarca}</p>
                            <p><b>Modelo:</b> {resultado.vehiculo.descripcionModelo}</p>
                            <p><b>Año:</b> {resultado.vehiculo.anioAuto}</p>
                            <p><b>País:</b> {resultado.vehiculo.descripcionPais}</p>
                        </div>

                        {/* ANT */}
                        <div style={styles.section}>
                            <h3 style={styles.sectionTitle}>Puntos de Licencia (ANT)</h3>

                            {resultado.puntosAnt.trim().startsWith("<") ? (
                                <p style={{ color: "#555" }}>
                                    La ANT devolvió una página HTML en lugar de un valor numérico.
                                    <br />
                                    <b>Consulta realizada correctamente.</b>
                                    <br />
                                    (Este servicio no entrega puntos sin sesión/captcha.)
                                </p>
                            ) : (
                                <p><b>Puntos:</b> {resultado.puntosAnt}</p>
                            )}
                        </div>

                    </div>
                )}
            </div>
        </div>
    );
}

const styles = {
    page: {
        backgroundColor: "#f5f7fb",
        minHeight: "100vh",
        padding: "0",
        margin: "0",
        fontFamily: "Arial, sans-serif",
    },
    header: {
        backgroundColor: "#033f8c", // Azul SRI
        padding: "25px",
        textAlign: "center",
        color: "white",
        fontWeight: "bold",
        marginBottom: "40px",
        boxShadow: "0px 2px 6px rgba(0,0,0,0.15)",
    },
    headerText: {
        margin: 0,
        fontSize: "26px",
    },
    card: {
        backgroundColor: "white",
        width: "500px",
        margin: "0 auto",
        padding: "30px",
        borderRadius: "12px",
        boxShadow: "0px 4px 10px rgba(0,0,0,0.15)",
    },
    title: {
        textAlign: "center",
        color: "#033f8c",
        fontSize: "22px",
        marginBottom: "20px",
    },
    label: {
        marginTop: "10px",
        marginBottom: "5px",
        fontWeight: "bold",
    },
    input: {
        width: "100%",
        padding: "12px",
        borderRadius: "8px",
        border: "1px solid #cdd3df",
        marginBottom: "15px",
        fontSize: "14px",
    },
    button: {
        width: "100%",
        padding: "14px",
        backgroundColor: "#033f8c",
        color: "white",
        fontWeight: "bold",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
        fontSize: "16px",
    },
    error: {
        backgroundColor: "#ffdddd",
        color: "#b00000",
        padding: "12px",
        borderRadius: "8px",
        marginBottom: "20px",
        textAlign: "center",
        fontWeight: "bold",
    },
    resultsArea: {
        marginTop: "30px",
        backgroundColor: "#eef3ff",
        padding: "20px",
        borderRadius: "10px",
    },
    subtitle: {
        textAlign: "center",
        color: "#033f8c",
        fontSize: "20px",
        marginBottom: "15px",
    },
    section: {
        backgroundColor: "white",
        padding: "15px",
        borderRadius: "8px",
        boxShadow: "0px 2px 5px rgba(0,0,0,0.1)",
        marginBottom: "20px",
    },
    sectionTitle: {
        color: "#033f8c",
        fontSize: "18px",
        marginBottom: "8px",
    },
};

export default App;
