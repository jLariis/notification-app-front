import classNames from 'classnames'

interface categryPillsProps {
  value: string;
}

export default function CategoryPill( props: categryPillsProps) {
    const {value} = props;

    return (
      <span
        className={classNames(
          "px-3 py-1 uppercase leading-wide font-bold text-xs rounded-full shadow-sm",
          value === "Movies" ? "bg-green-100 text-green-700" :
          value === "Sports" ? "bg-yellow-100 text-yellow-700" : 
          value === "Finance" ? "bg-red-100 text-red-700" : "bg-purple-100 text-purple-700"
        )}
      >
        {value}
      </span>
    );
  }