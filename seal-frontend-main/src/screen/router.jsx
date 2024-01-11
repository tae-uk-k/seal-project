import { useEffect } from 'react'
import { BrowserRouter, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { AllRouter } from './all/router'
import { SignIn } from './auth/signIn'
import { SignUp } from './auth/signUp'
import { My} from './my/my'
import { PostRouter } from './post/router'
import { Wtf } from './wtf/wtf'


function Root() {
    const navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            navigate('/post')
        } else {
            navigate('/sign-in')
        }
    }, [navigate])

    return (<></>)
}

function ScrollToTop() {
    const { pathname } = useLocation();
  
    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);
  
    return null;
  }

export function Router(props) {
    return (
        <BrowserRouter>
            <ScrollToTop />
            <Routes>
                <Route path='/sign-in/*' element={<SignIn />} />
                <Route path='/sign-up/*' element={<SignUp />} />                
                <Route path='/post/*' element={<PostRouter />} />
                <Route path='/my/*' element={<My />} />
                <Route path='/all/*' element={<AllRouter />} />
                <Route path='/' element={<Root />} />
                <Route path='*' element={<Wtf />} />
            </Routes>
        </BrowserRouter>
    )
}