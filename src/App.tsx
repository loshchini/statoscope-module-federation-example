import * as React from 'react';
import { Button } from 'antd';
import 'antd/dist/antd.css';

const App = () => (
    <div>
        <h1>Typescript</h1>
        <h2>App 1</h2>
        <React.Suspense fallback='Loading Button'>
            Statoscope Module Federation

            <Button type='primary' style={{ marginLeft: 8 }}>
                Primary Button
            </Button>
        </React.Suspense>
    </div>
);

export default App;
