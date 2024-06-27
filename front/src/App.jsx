import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
};

function App() {

    const [token, setToken] = useState(null);
    const [user, setUser] = useState(null);
    const query = useQuery();

    useEffect(() => {
        const token = query.get('this_site_token');
        const user = query.get('user_info');
        if (token && user) {
            setToken(token);
            setUser(JSON.parse(decodeURIComponent(user)));
        }
    }, [query]);

  return (
    <>
        <div>
            <div>This is Google oAuth Test Page for backend redirect_uri</div>
            <li>[Google console, .env, NPM, Vite] 사용법은 설명 안해도 잘 알것으로 기대한다.</li>
            <li>I expect that you already know how to use [Google Console, .env, NPM, Vite], so I won't explain it.</li>
            <hr></hr>
            <li>Web browser Click Login to request to backend /auth/login</li>
            <li>backend /auth/login request to Google Auth URL</li>
            <li>Google Auth URL redirect to backend /auth/callback</li>
            <li>backend /auth/callback redirect to Web Browser</li>
            <li>Web Browser(React) refresh Response Data</li>
            {token ? (
                <div>
                    <h1>Logged in</h1>
                    <pre>this_site_token for next request.(Not Google): {token}</pre>
                    <li>Typically, the token is generated in the backend callback and stored in a DBMS or cache (e.g., Redis).</li>
                    <pre>User Info from Google(scope email, profile)</pre>
                    <pre>{JSON.stringify(user, null, 2)}</pre>
                </div>
            ) : (
                <h1>Click: <a href="http://localhost:3000/oauth/login">Login</a></h1>
            )}
        </div>      
        
    </>
  )
}

export default App
