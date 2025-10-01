import './styles.css';
import { startApp } from './app';
import { renderProjects, setupEventListeners, selectFirstProject } from './dom';

startApp();

renderProjects();
selectFirstProject();
setupEventListeners();