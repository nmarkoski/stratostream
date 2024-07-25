import {cn} from "@/lib/utils";

export function DesktopBlock({children, className}: React.HTMLProps<HTMLDivElement>) {

    return(
        <div className={cn(className, 'hidden md:block')}>
            {children}
        </div>
    );
}

export function DesktopInlineBlock({children, className}: React.HTMLProps<HTMLDivElement>) {

    return(
        <div className={cn(className, 'hidden md:inline-block')}>
            {children}
        </div>
    );
}

export function DesktopFlex({children, className}: React.HTMLProps<HTMLDivElement>) {

    return(
        <div className={cn(className, 'hidden md:flex')}>
            {children}
        </div>
    );
}

export function MobileBlock({children, className}: React.HTMLProps<HTMLDivElement>) {

    return(
        <div className={cn(className, 'block md:hidden')}>
            {children}
        </div>
    );
}

export function MobileInlineBlock({children, className}: React.HTMLProps<HTMLDivElement>) {

    return(
        <div className={cn(className, 'inline-block md:hidden')}>
            {children}
        </div>
    );
}

export function MobileFlex({children, className}: React.HTMLProps<HTMLDivElement>) {

    return(
        <div className={cn(className, 'flex md:hidden')}>
            {children}
        </div>
    );
}