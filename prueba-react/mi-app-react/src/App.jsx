import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Option2 from './components/Option2';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/option2" element={<Option2 />} />
    </Routes>
  );
}