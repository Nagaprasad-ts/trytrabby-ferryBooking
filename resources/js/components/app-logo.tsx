import AppLogoIcon from './app-logo-icon';

export default function AppLogo({ width, height }: { width?: number; height?: number }) {
    return (
        <>
            <div className={`w-${width} h-${height} flex items-center justify-center rounded-md`}>
                <AppLogoIcon />
            </div>
        </>
    );
}
