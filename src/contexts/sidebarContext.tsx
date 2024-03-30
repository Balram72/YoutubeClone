import { ReactNode, createContext, useContext, useState } from "react"

type SiderbarProviderProps = {
    children : ReactNode
}


type SiderbarContextType = {
    isLargeOpen : boolean,
    isSmallOpen : boolean,
    toggle : ()=> void
    close : () => void
}

const SiderbarContext = createContext<SiderbarContextType | null>(null)


export function useSidebarContext(){
   const value = useContext(SiderbarContext)
   if(value == null) throw Error("Cannot use  outside of SidebarProvider")
   return value;
}

export function SidebarProvider({children}:SiderbarProviderProps){
    const  [ isLargeOpen ,setIsLargeOpen ] = useState(true)
    const   [isSmallOpen,setIsSmallOpen ]  = useState(false)

    function isScreenSmall(){
        return window.innerWidth < 1024
    }

    function toggle(){
        if(isScreenSmall()){
            setIsSmallOpen(s => !s)
        }else{
            setIsLargeOpen(l => !l)
        }
    }

    function close(){
        if(isScreenSmall()){
            setIsSmallOpen(false)
        }else{
            setIsLargeOpen(false)
        }
    }


    return (
        <SiderbarContext.Provider value={{isLargeOpen,isSmallOpen,toggle,close}}>
                {children}
        </SiderbarContext.Provider>
    )

}