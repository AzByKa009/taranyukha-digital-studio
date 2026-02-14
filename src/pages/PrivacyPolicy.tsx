import { Layout } from "@/components/layout/Layout";
import { useSEO } from "@/hooks/useSEO";

const PrivacyPolicy = () => {
  useSEO({
    title: "Политика конфиденциальности | Тарануха",
    description: "Политика обработки персональных данных в соответствии с ФЗ-152",
  });

  return (
    <Layout>
      <section className="py-16 md:py-24">
        <div className="container max-w-3xl mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-8">Политика конфиденциальности</h1>

          <div className="prose prose-invert max-w-none space-y-6 text-muted-foreground">
            <p>Настоящая Политика конфиденциальности определяет порядок обработки и защиты персональных данных пользователей сайта taranukha.dev (далее — «Сайт»).</p>

            <h2 className="text-xl font-semibold text-foreground mt-8">1. Общие положения</h2>
            <p>Оператор обработки персональных данных обеспечивает защиту обрабатываемых персональных данных в соответствии с Федеральным законом от 27.07.2006 №152-ФЗ «О персональных данных».</p>

            <h2 className="text-xl font-semibold text-foreground mt-8">2. Какие данные мы собираем</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Имя</li>
              <li>Контактные данные (телефон, email, Telegram)</li>
              <li>Сообщения, оставленные через формы обратной связи</li>
              <li>Данные об использовании сайта (страницы, устройство, браузер)</li>
            </ul>

            <h2 className="text-xl font-semibold text-foreground mt-8">3. Цели обработки данных</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Обработка входящих запросов и заявок</li>
              <li>Связь с пользователем для оказания услуг</li>
              <li>Улучшение качества сайта и сервиса</li>
              <li>Аналитика посещаемости</li>
            </ul>

            <h2 className="text-xl font-semibold text-foreground mt-8">4. Передача данных третьим лицам</h2>
            <p>Персональные данные пользователей не передаются третьим лицам, за исключением случаев, предусмотренных законодательством РФ.</p>

            <h2 className="text-xl font-semibold text-foreground mt-8">5. Защита данных</h2>
            <p>Оператор принимает необходимые организационные и технические меры для защиты персональных данных от неправомерного доступа, уничтожения, изменения и распространения.</p>

            <h2 className="text-xl font-semibold text-foreground mt-8">6. Права пользователя</h2>
            <p>Пользователь вправе запросить информацию об обработке своих персональных данных, потребовать их уточнения, блокирования или уничтожения, обратившись через форму обратной связи на сайте.</p>

            <h2 className="text-xl font-semibold text-foreground mt-8">7. Согласие</h2>
            <p>Используя данный сайт и отправляя свои данные через формы, пользователь выражает согласие с настоящей Политикой конфиденциальности.</p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default PrivacyPolicy;
