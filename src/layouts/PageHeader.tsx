import { useState } from 'react'
import logo from '../assets/YoutubeLogo.png';
import { ArrowLeft, Bell,Menu, Mic, Search, User, Video} from 'lucide-react';
import { Button } from '../components/Button';
import { useSidebarContext } from '../contexts/sidebarContext';

const PageHeader = () => {
    const [showFullWidthSearch,setShowFullWidthSearch] = useState(false)
  return (
    <div className='flex gap-10 lg:gap-20 justify-between pt-3 mb-6 mx-4'>
            <PageHeaderFirstSecation hidden={showFullWidthSearch}/>
        <form className={`gap-4 flex-grow justify-center ${showFullWidthSearch ? "flex":"hidden md:flex"}`}>
                    { showFullWidthSearch && (
                        <Button 
                            onClick={()=> setShowFullWidthSearch(false)}
                            type='button' size="icon" variant="ghost" className='flex-shrink-0'>
                            <ArrowLeft />
                         </Button>
                    )}
                    <div className='flex flex-grow max-w-[600px]'>

                        <input type='Search' placeholder='Search' 
                        className='rounded-l-full border border-secondary-border shadow-inner shadow-secondary py-1 px-4 text-lg w-full
                            focus:border-blue-500 outline-none'
                        />
                        <Button className='py-2 px-4 rounded-r-full border-secondary-border border border-l-0 flex-shrink-0'>
                            <Search/>
                        </Button>
                    </div>  
                <Button type='button' size="icon" className='flex-shrink-0'>
                    <Mic/>
                </Button>
        </form>

        <div className={`flex-shrink-0 md:grp-2 ${showFullWidthSearch ? "hidden":"flex"}`}>
            <Button size="icon" onClick={()=>{setShowFullWidthSearch(true)}} variant="ghost" className='md:hidden'>
                    <Search/>
            </Button>
            <Button size="icon" variant="ghost" className='md:hidden'>
                    <Mic/>
            </Button>
            <Button size="icon" variant="ghost">
                    <Video/>
            </Button>
            <Button size="icon" variant="ghost">
                    <Bell/>
            </Button>
            <Button size="icon" variant="ghost">
                    <User/>
            </Button>
        </div>
    </div>
  )
}

export default PageHeader


type PageHeaderFirstSecationProps = {
    hidden?:boolean
}

export  function PageHeaderFirstSecation({hidden = false}:PageHeaderFirstSecationProps){
    const {toggle} = useSidebarContext()
    return (
            <div className ={`gap-4 items-center flex-shrink-0 ${hidden ? "hidden":"flex"}`}>
                <Button  onClick={toggle} variant="ghost" size="icon">
                    <Menu />
                </Button>
                <a href="/">
                    <img src={logo}  className='h-11'/>
                </a>
            </div>
    )
}