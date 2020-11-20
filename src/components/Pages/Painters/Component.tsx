import React from 'react';

interface IProps { }
const Main = (props: IProps) => {
    return (
        <main>
            <section>
                <section>search</section>
                <section>
                    <div>tag container</div>
                    <div>Etsi projektiisi sopivia urakoitsijoita ja pyydä tarjous!</div>
                </section>
            </section>

        </main>
    );
}

export default React.memo(Main);