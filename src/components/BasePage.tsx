/**
 * Base Page component which will represent the base page layout which can be printed on any page
 */
import './BasePage.scss';

type BasePageProps = {
  children: React.ReactNode;
  size?: '' | 'A4' | 'A4-landscape';
  className?: string;
};

export function BasePage({
  children,
  size = '',
  className = ''
}: BasePageProps) {
  return (
    <div className={`base-page ${size} ${className}`}>
      {children}
    </div>
  );
}