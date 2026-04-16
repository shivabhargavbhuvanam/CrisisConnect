import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import TranslateIcon from '@mui/icons-material/Translate';
import './../Home.css';

function LanguageDropdown() {
    const { i18n } = useTranslation();
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef(null);

    const changeLanguage = (language: any) => {
        i18n.changeLanguage(language);
        setShowDropdown(false); // Close the dropdown after selection
    };

    // Toggle dropdown display
    const toggleDropdown = () => setShowDropdown(!showDropdown);

    // Close dropdown when clicked outside
    useEffect(() => {
        const handleClickOutside = (event: any) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div ref={dropdownRef} className="language-dropdown">
            <button onClick={toggleDropdown} className="language-icon">
                <TranslateIcon className='translate-icon'/>
            </button>
            {showDropdown && (
                <ul className="language-select">
                    <li onClick={() => changeLanguage('en')}>English</li>
                    <li onClick={() => changeLanguage('tel')}>Telugu</li>
                    <li onClick={() => changeLanguage('esp')}>Spanish</li>
                    {/* Add more options as needed */}
                </ul>
            )}
        </div>
    );
}

export default LanguageDropdown;