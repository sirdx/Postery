import '../styles/home.scss';
import { useTranslation } from 'react-i18next';

export default function Home() {
  const { t } = useTranslation();
  
  return (
    <div className='home'>
      <aside>
        <h2>{t('home_users')}</h2>
      </aside>
      <main>
        <div className='header'>
          <div className='header-bar'></div>
          <h1>{t('nav_home')}</h1>
        </div>
        <div className='content'>
          <article className='posts'>
            <div className='header'>
              <div className='header-bar'></div>
              <h2>{t('home_category_1')}</h2>
            </div>
            <ul>
              <li>
                <a href='posts'><h3>Post title</h3></a>
                <p>Description Lorem ipsum dolor sit, amet consectetur adipisicing elit. Expedita rem sapiente dolorem nostrum labore voluptas obcaecati ullam porro quod, dolores consequuntur sed ratione dicta esse ad necessitatibus quasi aut! Nobis! Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas odit consequuntur eius possimus nisi odio, dolorum quidem error distinctio. Tempore, sit molestiae? Consectetur quae porro minus tempora non praesentium tenetur!</p>
              </li>
              <li>
                <a><h3>Post title</h3></a>
                <p>Description Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos dolores odio perspiciatis, vel repellendus fugiat pariatur provident nesciunt! Quis in sunt suscipit sint iste dolorum, quidem iure. Doloribus, totam a! Lorem ipsum dolor sit, amet consectetur adipisicing elit. Expedita rem sapiente dolorem nostrum labore voluptas obcaecati ullam porro quod, dolores consequuntur sed ratione dicta esse ad necessitatibus quasi aut! Nobis! Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas odit consequuntur eius possimus nisi odio, dolorum quidem error distinctio. Tempore, sit molestiae? Consectetur quae porro minus tempora non praesentium tenetur!</p>
              </li>
              <li>
                <a><h3>Post title</h3></a>
                <p>Description Lorem ipsum dolor sit, amet consectetur adipisicing elit. Expedita rem sapiente dolorem nostrum labore voluptas obcaecati ullam porro quod, dolores consequuntur sed ratione dicta esse ad necessitatibus quasi aut! Nobis! Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas odit consequuntur eius possimus nisi odio, dolorum quidem error distinctio. Tempore, sit molestiae? Consectetur quae porro minus tempora non praesentium tenetur!</p>
              </li>
            </ul>
          </article>
          <article className='posts'>
            <div className='header'>
              <div className='header-bar'></div>
              <h2>{t('home_category_1')}</h2>
            </div>
            <ul>
              <li>
                <a href='posts'><h3>Post title</h3></a>
                <p>Description Lorem ipsum dolor sit, amet consectetur adipisicing elit. Expedita rem sapiente dolorem nostrum labore voluptas obcaecati ullam porro quod, dolores consequuntur sed ratione dicta esse ad necessitatibus quasi aut! Nobis! Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas odit consequuntur eius possimus nisi odio, dolorum quidem error distinctio. Tempore, sit molestiae? Consectetur quae porro minus tempora non praesentium tenetur!</p>
              </li>
            </ul>
          </article>
          <article className='posts'>
            <div className='header'>
              <div className='header-bar'></div>
              <h2>{t('home_category_1')}</h2>
            </div>
            <ul>
              <li>
                <a href='posts'><h3>Post title</h3></a>
                <p>Description Lorem ipsum dolor sit, amet consectetur adipisicing elit. Expedita rem sapiente dolorem nostrum labore voluptas obcaecati ullam porro quod, dolores consequuntur sed ratione dicta esse ad necessitatibus quasi aut! Nobis! Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas odit consequuntur eius possimus nisi odio, dolorum quidem error distinctio. Tempore, sit molestiae? Consectetur quae porro minus tempora non praesentium tenetur!</p>
              </li>
              <li>
                <a><h3>Post title</h3></a>
                <p>Description Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos dolores odio perspiciatis, vel repellendus fugiat pariatur provident nesciunt! Quis in sunt suscipit sint iste dolorum, quidem iure. Doloribus, totam a! Lorem ipsum dolor sit, amet consectetur adipisicing elit. Expedita rem sapiente dolorem nostrum labore voluptas obcaecati ullam porro quod, dolores consequuntur sed ratione dicta esse ad necessitatibus quasi aut! Nobis! Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas odit consequuntur eius possimus nisi odio, dolorum quidem error distinctio. Tempore, sit molestiae? Consectetur quae porro minus tempora non praesentium tenetur!</p>
              </li>
              <li>
                <a><h3>Post title</h3></a>
                <p>Description Lorem ipsum dolor sit, amet consectetur adipisicing elit. Expedita rem sapiente dolorem nostrum labore voluptas obcaecati ullam porro quod, dolores consequuntur sed ratione dicta esse ad necessitatibus quasi aut! Nobis! Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas odit consequuntur eius possimus nisi odio, dolorum quidem error distinctio. Tempore, sit molestiae? Consectetur quae porro minus tempora non praesentium tenetur!</p>
              </li>
            </ul>
          </article>
        </div>
      </main>
    </div>
  );
}