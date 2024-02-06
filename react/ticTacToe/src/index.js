import {createRoot} from "react-dom/client";
import App from "./App";
import "./styles.css"

// 入口文件

// 在React18中，已弃用ReactDOM.render
// before:
/*
import { render } from 'react-dom';
const container = document.getElementById('root');
render(<App/>, container);
 */


// container = document.getElementById('root');
const root = createRoot(document.getElementById('root'));
root.render(<App/>);