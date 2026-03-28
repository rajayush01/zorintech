import React, { useRef, useState, useEffect } from 'react';

interface AnimatedItemProps {
    children: React.ReactNode;
    delay?: number;
    index: number;
    onMouseEnter: () => void;
    onClick: () => void;
}

const AnimatedItem: React.FC<AnimatedItemProps> = ({
    children,
    delay = 0,
    index,
    onMouseEnter,
    onClick,
}) => {
    const ref = useRef<HTMLDivElement | null>(null);
    const [inView, setInView] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setInView(entry.isIntersecting);
            },
            { threshold: 0.5 }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, []);

    return (
        <div
            ref={ref}
            data-index={index}
            onMouseEnter={onMouseEnter}
            onClick={onClick}
            className={`mb-4 cursor-pointer transition-all duration-200 ${
                inView ? 'opacity-100 scale-100' : 'opacity-70 scale-95'
            }`}
        >
            {children}
        </div>
    );
};

interface AnimatedListProps<T> {
    items: T[];
    onItemSelect?: (item: T, index: number) => void;
    showGradients?: boolean;
    enableArrowNavigation?: boolean;
    className?: string;
    itemClassName?: string;
    displayScrollbar?: boolean;
    initialSelectedIndex?: number;
    renderItem?: (item: T, index: number, isSelected: boolean) => React.ReactNode;
    gradientColor?: string;
    autoScroll?: boolean;
    autoScrollSpeed?: number;
    pauseOnHover?: boolean;
}

const AnimatedList = <T,>({
    items,
    onItemSelect,
    showGradients = true,
    enableArrowNavigation = true,
    className = '',
    itemClassName = '',
    displayScrollbar = true,
    initialSelectedIndex = -1,
    renderItem,
    gradientColor = 'blue-50',
    autoScroll = false,
    autoScrollSpeed = 30,
    pauseOnHover = true,
}: AnimatedListProps<T>) => {
    const listRef = useRef<HTMLDivElement | null>(null);
    const [selectedIndex, setSelectedIndex] = useState(initialSelectedIndex);
    const [keyboardNav, setKeyboardNav] = useState(false);
    const [topGradientOpacity, setTopGradientOpacity] = useState(0);
    const [bottomGradientOpacity, setBottomGradientOpacity] = useState(1);
    const [isHovered, setIsHovered] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const scrollIntervalRef = useRef<NodeJS.Timeout | null>(null);
    const scrollDirectionRef = useRef<'down' | 'up'>('down');

    const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
        const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
        setTopGradientOpacity(Math.min(scrollTop / 50, 1));
        const bottomDistance = scrollHeight - (scrollTop + clientHeight);
        setBottomGradientOpacity(
            scrollHeight <= clientHeight ? 0 : Math.min(bottomDistance / 50, 1)
        );
    };

    // Auto-scroll functionality
    useEffect(() => {
        if (!autoScroll || !listRef.current) return;

        const startAutoScroll = () => {
            if (scrollIntervalRef.current) {
                clearInterval(scrollIntervalRef.current);
            }

            scrollIntervalRef.current = setInterval(() => {
                if (listRef.current && (!pauseOnHover || !isHovered) && !isPaused) {
                    const container = listRef.current;
                    const { scrollTop, scrollHeight, clientHeight } = container;
                    const scrollStep = 1;

                    if (scrollDirectionRef.current === 'down') {
                        if (scrollTop + clientHeight >= scrollHeight - 10) {
                            // Reached bottom, change direction
                            scrollDirectionRef.current = 'up';
                        } else {
                            container.scrollTop += scrollStep;
                        }
                    } else {
                        if (scrollTop <= 10) {
                            // Reached top, change direction
                            scrollDirectionRef.current = 'down';
                        } else {
                            container.scrollTop -= scrollStep;
                        }
                    }
                }
            }, autoScrollSpeed);
        };

        startAutoScroll();

        return () => {
            if (scrollIntervalRef.current) {
                clearInterval(scrollIntervalRef.current);
            }
        };
    }, [autoScroll, autoScrollSpeed, isHovered, pauseOnHover, isPaused]);

    // Keyboard navigation
    useEffect(() => {
        if (!enableArrowNavigation) return;
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowDown' || (e.key === 'Tab' && !e.shiftKey)) {
                e.preventDefault();
                setKeyboardNav(true);
                setIsPaused(true);
                setSelectedIndex((prev) => Math.min(prev + 1, items.length - 1));
            } else if (e.key === 'ArrowUp' || (e.key === 'Tab' && e.shiftKey)) {
                e.preventDefault();
                setKeyboardNav(true);
                setIsPaused(true);
                setSelectedIndex((prev) => Math.max(prev - 1, 0));
            } else if (e.key === 'Enter') {
                if (selectedIndex >= 0 && selectedIndex < items.length) {
                    e.preventDefault();
                    if (onItemSelect) {
                        onItemSelect(items[selectedIndex], selectedIndex);
                    }
                }
            } else if (e.key === 'Escape') {
                setIsPaused(false);
                setSelectedIndex(-1);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [items, selectedIndex, onItemSelect, enableArrowNavigation]);

    useEffect(() => {
        if (!keyboardNav || selectedIndex < 0 || !listRef.current) return;
        const container = listRef.current;
        const selectedItem = container.querySelector<HTMLDivElement>(
            `[data-index="${selectedIndex}"]`
        );
        if (selectedItem) {
            const extraMargin = 50;
            const containerScrollTop = container.scrollTop;
            const containerHeight = container.clientHeight;
            const itemTop = selectedItem.offsetTop;
            const itemBottom = itemTop + selectedItem.offsetHeight;
            if (itemTop < containerScrollTop + extraMargin) {
                container.scrollTo({ top: itemTop - extraMargin, behavior: 'smooth' });
            } else if (itemBottom > containerScrollTop + containerHeight - extraMargin) {
                container.scrollTo({
                    top: itemBottom - containerHeight + extraMargin,
                    behavior: 'smooth',
                });
            }
        }
        setKeyboardNav(false);
    }, [selectedIndex, keyboardNav]);

    return (
        <div className={`relative w-full ${className}`}>
            <div
                ref={listRef}
                className={`max-h-[500px] overflow-y-auto p-4 ${displayScrollbar
                        ? "[&::-webkit-scrollbar]:w-[6px] [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-[3px] [&::-webkit-scrollbar-thumb]:hover:bg-gray-400"
                        : "scrollbar-hide"
                    }`}
                onScroll={handleScroll}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                style={{
                    scrollbarWidth: displayScrollbar ? "thin" : "none",
                    scrollbarColor: "#d1d5db #f3f4f6",
                }}
            >
                {items.map((item, index) => (
                    <AnimatedItem
                        key={index}
                        delay={index * 0.05}
                        index={index}
                        onMouseEnter={() => {
                            setSelectedIndex(index);
                            setIsPaused(true);
                        }}
                        onClick={() => {
                            setSelectedIndex(index);
                            setIsPaused(false);
                            if (onItemSelect) {
                                onItemSelect(item, index);
                            }
                        }}
                    >
                        {renderItem?.(item, index, selectedIndex === index)}
                    </AnimatedItem>
                ))}
            </div>
            
            {autoScroll && (
                <div className="absolute top-2 right-2 flex gap-1">
                    <button
                        onClick={() => setIsPaused(!isPaused)}
                        className="bg-black bg-opacity-20 hover:bg-opacity-30 text-white px-2 py-1 rounded text-xs transition-all"
                        title={isPaused ? "Resume auto-scroll" : "Pause auto-scroll"}
                    >
                        {isPaused ? '▶️' : '⏸️'}
                    </button>
                </div>
            )}
            
            {showGradients && (
                <>
                    <div
                        className={`absolute top-0 left-0 right-0 h-[50px] bg-gradient-to-b from-white to-transparent pointer-events-none transition-opacity duration-300 ease`}
                        style={{ opacity: topGradientOpacity }}
                    />
                    <div
                        className={`absolute bottom-0 left-0 right-0 h-[100px] bg-gradient-to-t from-white to-transparent pointer-events-none transition-opacity duration-300 ease`}
                        style={{ opacity: bottomGradientOpacity }}
                    />
                </>
            )}
        </div>
    );
};

export default AnimatedList;