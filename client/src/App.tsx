import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import { Container } from '@chakra-ui/react';
import HomePage from './pages/Home.page';
import ProjectPage from './pages/Project.page';
import NewProjectPage from './pages/NewProject.page';

function App() {
  return (
    <Container centerContent minWidth="80vw">
      <Header />
      <Router>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="projects/:id" element={<ProjectPage />} />
          <Route path="projects/new" element={<NewProjectPage />} />
        </Routes>
      </Router>
    </Container>
  );
}

export default App;
