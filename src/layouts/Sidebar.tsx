import { ChevronDown, ChevronUp, Clapperboard, Clock, Film, FlagIcon, Flame, Gamepad2, HelpCircle, History, Home, Library, Lightbulb, ListVideo, MessageSquareWarning, Music2, Newspaper, Podcast, Radio, Repeat, Settings, Shirt, ShoppingBag, ThumbsUp, Trophy } from "lucide-react";
import { Children, ElementType, ReactNode, useState } from "react";
import kidsLogo from '../assets/kids.png';
import MusicLogo from '../assets/music.png';
import youtubeLogo from '../assets/youtube.png';
import { Button, buttonStyles } from "../components/Button";
import { twMerge } from "tailwind-merge";
import { playlists, subscriptions } from "../data/sidebar";
import { useSidebarContext } from "../contexts/sidebarContext";
import { PageHeaderFirstSecation } from "./PageHeader";

export function Sidebar(){
       const {isLargeOpen,isSmallOpen,close} = useSidebarContext()
    return(
        <>
            <aside className={`sticky top-0 overflow-y-auto scrollbar-hidden pb-4 flex flex-col ml-1 ${isLargeOpen ? "lg:hidden":"lg-fx"}`}>
                <SmallSidebarItem Icon={Home} title="Home" url="/" />
                <SmallSidebarItem Icon={Repeat} title="Shorts" url="/" />
                <SmallSidebarItem Icon={Clapperboard} title="Subscriptions" url="/subscriptions"/>
                <SmallSidebarItem Icon={Library} title="You" url="/library"/>
            </aside>

                {isSmallOpen && (
                    <div onClick={close} className="lg:hidden fixed inset-0 z-[999] bg-black opacity-50"/>
                )}

            <aside className={`w-56 lg:sticky absolute top-0 overflow-y-auto scrollbar-hidden pb-4 flex-col gap-2 px-2 ${isLargeOpen?"lg:flex":"lg:hidden"} ${isSmallOpen?"flex z-[999] bg-white max-h-screen":"hidden"}`}>
                    <div className="lg:hidden pt-2 pb-4 px-2 sticky top-0 bg-white">
                        <PageHeaderFirstSecation/>
                    </div>
                    <LargeSidebarSecation>
                            <LargeSidebarItem isActive IconorImageUrl={Home} title="Home" url="/"/>
                            {/* <LargeSidebarItem isActive IconorImageUrl={} title="Home" url="/"/> */}
                            <LargeSidebarItem IconorImageUrl={Clapperboard} title="Subscriptions" url="/subscriptions"/>

                    </LargeSidebarSecation>
                    <hr/>
                        
                       <LargeSidebarSecation visibleItemCount={5} title="You">
                            <LargeSidebarItem IconorImageUrl={History} title="History" url="/history"/>
                            <LargeSidebarItem IconorImageUrl={Clock} title="Watch Later" url="/clock"/>
                            <LargeSidebarItem IconorImageUrl={ThumbsUp} title="Like Videos" url="/like-videos"/>
                            {playlists.map(playlists=>(
                                <LargeSidebarItem key={playlists.id} IconorImageUrl={ListVideo} 
                                title={playlists.name} url={`/playlist?list=${playlists.id}`} />
                             ))}
                       </LargeSidebarSecation>
                    <hr/>
                        <LargeSidebarSecation title="Subscriptions">
                            {
                                subscriptions.map(subscription =>(
                                    <LargeSidebarItem key={subscription.id} 
                                    IconorImageUrl={subscription.imgUrl} 
                                    title={subscription.channelName} 
                                    url={`/@${subscription.id}`}
                                    />
                                ))}
                        </LargeSidebarSecation>
                    <hr />
                    <LargeSidebarSecation title="Explore">
                            <LargeSidebarItem IconorImageUrl={Flame} title="Trending" url="/trending"/>
                            <LargeSidebarItem IconorImageUrl={ShoppingBag} title="Shopping" url="/shopping"/>
                            <LargeSidebarItem IconorImageUrl={Music2} title="Music" url="/music"/>
                            <LargeSidebarItem IconorImageUrl={Film} title="Movies & Tv" url="/movies-tv"/>
                            <LargeSidebarItem IconorImageUrl={Radio} title="Live" url="/live"/>
                            <LargeSidebarItem IconorImageUrl={Gamepad2} title="Gaming" url="/gaming"/>
                            <LargeSidebarItem IconorImageUrl={Newspaper} title="News" url="/news"/>
                            <LargeSidebarItem IconorImageUrl={Trophy} title="Trohhy" url="/trophy"/>
                            <LargeSidebarItem IconorImageUrl={Lightbulb} title="Courses" url="/courses"/>
                            <LargeSidebarItem IconorImageUrl={Shirt} title="Fashion & beauty" url="/fashion-beauty"/>
                            <LargeSidebarItem IconorImageUrl={Podcast} title="Podcasts" url="/podcasts"/>
                            <hr />
                        </LargeSidebarSecation>
                        <LargeSidebarSecation title="More From Youtube">
                                <LargeSidebarItem IconorImageUrl={youtubeLogo} title="YouTube Premium " url="/youtube-premium"/>
                                <LargeSidebarItem IconorImageUrl={MusicLogo} title="YouTube Music" url="/youtube-music"/>
                                <LargeSidebarItem IconorImageUrl={kidsLogo} title="YouTube Kids" url="/youtube-kids"/>  
                                <hr />     
                        </LargeSidebarSecation>
                        <LargeSidebarSecation>
                            <LargeSidebarItem IconorImageUrl={Settings} title="Setting" url="/setting"/>
                            <LargeSidebarItem IconorImageUrl={FlagIcon} title="Report history" url="/report"/>
                            <LargeSidebarItem IconorImageUrl={HelpCircle} title="Help" url="/Help"/>
                            <LargeSidebarItem IconorImageUrl={MessageSquareWarning} title="Warning" url="/warning"/>
                    </LargeSidebarSecation>

            </aside>
        </>
      
    )
}

type SmallSidebarItemProps = {
    Icon: ElementType
    title: string
    url: string
}

function SmallSidebarItem({Icon,title,url}:SmallSidebarItemProps){

    return(
        <a href={url} className={twMerge(buttonStyles({variant:"ghost"}),"py-4 px-1 flex flex-col items-center rounded-lg gap-1")}>
            <Icon className="w-6 h-6"/>
            <div className="text-sm">{title}</div>
        </a>
    )
}

type LargeSidebarSecationPropos = {
    children : ReactNode
    title?: string
    visibleItemCount?: number
}


function LargeSidebarSecation({ children,title,visibleItemCount = Number.POSITIVE_INFINITY }:LargeSidebarSecationPropos){
    const [isExpanded,setisExpanded] = useState(false)
    const childrenArray = Children.toArray(children).flat();
    const showExpandButton = childrenArray.length > visibleItemCount;
    const visibalChildren =  isExpanded? childrenArray :childrenArray.slice(0,visibleItemCount)
    const ButtonIcon = isExpanded ? ChevronUp : ChevronDown
    return(
        <div>
                {title && <div className="ml-4 mt-2 text-lg mb-1"> 
                        {title}
                    </div>}
                {visibalChildren}
                {showExpandButton &&  <Button onClick={()=>setisExpanded(e=>!e)} className="w-full flex titems-center rounded-lg gap-4 p-3" variant="ghost">
                        <ButtonIcon className="w-6 h-6"/> <div>{isExpanded?"Show Less":"Show More"}</div>
                    </Button>}
        </div>
    )
}

type LargeSidebarItemProps = {
    IconorImageUrl: ElementType |string
    title: string
    url: string
    isActive?:boolean
}

function LargeSidebarItem({IconorImageUrl,title,url,isActive=false}:LargeSidebarItemProps){
        return(
            <a href={url} className={`w-full flex items-center rounded-lg gap-4 p-3 ${isActive ? "font-bold bg-neutral-100 hover:bg-secondary" : ""}`}>
                {typeof IconorImageUrl === "string" ? (
                        <img src={IconorImageUrl} className="w-6 h-6 rounded-full" />
                    ) : (
                    <IconorImageUrl className="w-6 h-6" />
                )}
                <div className="whitespace-nowrap overflow-hidden text-ellipsis">{title}</div>
            </a>
       );
}