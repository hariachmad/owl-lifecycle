import { Component, xml, mount, useState } from "@odoo/owl";
import { MyComponent } from "./lifecycles/mycomponent";

class App extends Component {
    static components = { MyComponent};

    static template = xml`
        <div>
            <t>
                <MyComponent/>
            </t>
        </div>
    `;
}

mount(App, document.getElementById("app"));