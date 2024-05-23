import Select from './components/Select';
import Search from './components/Search';
import EmptyList from './components/EmptyList';
import ListItem from './components/ListItem';

export interface PostTypes {
    user: {
        name: string;
        id: string;
        photo: string;
    };
    content: string;
    imageUrl?: string;
    createdAt: Date;
    id: string;
}
const Wall = () => {
    const posts: PostTypes[] = [];
    return (
        <div className=''>
            <section className='grid grid-cols-[1fr_4fr] gap-x-6'>
                <Select />
                <Search />
            </section>
            <section>
                <div className=' mt-4 '>
                    {posts.length === 0 ? (
                        <EmptyList />
                    ) : (
                        posts?.map((item) => (
                            <ListItem item={item} key={item.id} />
                        ))
                    )}
                </div>
            </section>
        </div>
    );
};

export default Wall;
