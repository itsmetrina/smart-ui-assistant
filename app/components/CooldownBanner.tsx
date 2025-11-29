export default function CooldownBanner({ cooldown }: any) {
    if (cooldown <= 0) return null;
    return (
        <p className="text-red-400 text-sm mt-2 animate-pulse text-center">
            Too fast! Try again in {cooldown.toFixed(1)}s
        </p>
    );
}