import App from '../../App';
import { PropsWithChildren } from 'react';

const BlankLayout = ({ children }: PropsWithChildren) => {
    return (
        <App>
            <div className="min-h-screen text-black dark:text-white-dark">{children} </div>
        </App>
    );
};

export default BlankLayout;
