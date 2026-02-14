'use client';

/**
 * SkipLinks Component
 * 
 * Provides keyboard-accessible skip navigation links for improved accessibility.
 * Links are visually hidden until focused, allowing keyboard users to quickly
 * navigate to main content areas.
 */
export function SkipLinks() {
    return (
        <div className="skip-links">
            <a href="#verse-text" className="skip-link">
                Skip to verse
            </a>
            <a href="#ai-content" className="skip-link">
                Skip to analysis
            </a>
            <a href="#verse-navigation" className="skip-link">
                Skip to navigation
            </a>

            <style jsx>{`
                .skip-links {
                    position: absolute;
                    top: 0;
                    left: 0;
                    z-index: 9999;
                }

                .skip-link {
                    position: absolute;
                    left: -9999px;
                    top: 0;
                    padding: 0.75rem 1.5rem;
                    background-color: #8B4513;
                    color: white;
                    font-weight: 600;
                    text-decoration: none;
                    border-radius: 0 0 0.5rem 0;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                    transition: all 0.2s ease;
                }

                .skip-link:focus {
                    left: 0;
                    outline: 3px solid #D4A574;
                    outline-offset: 2px;
                }

                .skip-link:hover {
                    background-color: #6B3410;
                }
            `}</style>
        </div>
    );
}
