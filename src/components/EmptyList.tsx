const EmptyList = () => {
    return (
        <div className='itemWrapper'>
            <div className='*:rounded-full *:border *:border-darkGrey *:w-2 *:h-2 flex gap-x-1.5 py-5 px-4 borderBottom'>
                <div className='bg-apple'></div>
                <div className='bg-gold'></div>
                <div className='bg-grass'></div>
            </div>
            <p className='p-8 text-borderGrey'>
                目前尚無動態，新增一則貼文吧！
            </p>
        </div>
    );
};
export default EmptyList;