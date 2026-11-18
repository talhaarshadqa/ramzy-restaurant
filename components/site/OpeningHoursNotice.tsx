type Props = {
    openingHoursText: string;
    todaysStatusNote?: string | null;
    className?: string;
};

export function OpeningHoursNotice({openingHoursText, todaysStatusNote, className = ''}: Props) {
    return (
        <div className={className}>
            <p>{openingHoursText}</p>
            {todaysStatusNote && <p className="mt-1 font-semibold">{todaysStatusNote}</p>}
        </div>
    );
}
