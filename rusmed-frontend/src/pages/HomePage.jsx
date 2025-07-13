import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Container, Row, Col, Button, Form, Image } from "react-bootstrap";
import { HouseFill, GearFill, InfoCircleFill } from "react-bootstrap-icons";


export const HomePage= () => {
    return (
        <div className="container w-100 h-100 ">
        
            <div className="d-flex flex-column align-items-center justify-content-center h-100 w-100">
                <Image src="https://via.placeholder.com/200" rounded />
                <div className="mt-4">
                    <Button variant="primary" className="me-2">Iniciar</Button>
                    <Button variant="warning">Detener</Button>
                </div>
            </div>
    

        </div>
    )
}