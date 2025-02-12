import MyReactComponent from "../MyReactComponent";

class HtmlService extends MyReactComponent {
    static addLayoutScript(src) {
        let script = document.createElement("script");
        script.src = src;
        script.async = false;

        document.body.appendChild(script);
    }

    static showLoadingComponent(show_logo = false) {
        document.getElementById('loader').style.display = 'block';
        if (show_logo) document.getElementById('loader-logo').style.display = 'block';
    }

    static showContent() {
        document.getElementById('dt-root').style.display = 'block';
    }

    static resetContentScroll() {
        document.getElementById('content-wrapper').scrollIntoView({
            behavior: "smooth",
            block: "start",
            inline: "nearest"
        });
    }

    static scrollToTargetInContainer(container_id, target_id) {
        const container = document.getElementById(container_id);
        if (!container) return;

        const target = document.getElementById(target_id);
        if (!target) return;

        container.scrollTo({
          top: target.offsetTop,
          behavior: 'smooth'
        });
    }

    static fullScreenMode() {
        let html = document.documentElement;

        if (html.requestFullscreen) html.requestFullscreen();
        else if (html.webkitRequestFullscreen) html.webkitRequestFullscreen();
        else if (html.msRequestFullscreen) html.msRequestFullscreen();
    }

    static exitfullScreenMode() {
        if (document.exitFullscreen) document.exitFullscreen();
        else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
        else if (document.msExitFullscreen) document.msExitFullscreen();
    }
}

export default HtmlService;
