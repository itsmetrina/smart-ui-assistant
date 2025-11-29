export default function LoadingBar() {
    return (
        <div className="w-full h-1 bg-gray-800 overflow-hidden rounded">
            <div className="h-full bg-blue-500 animate-loading-bar"></div>
        </div>
    );
}