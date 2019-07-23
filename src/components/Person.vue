<script src="https://kit.fontawesome.com/487b296483.js"></script>
<template>
    <div class="card middle" style="background-color: #fff0;">
        <div class="front">
            <img :src="image"/>
        </div>
        <div class="back">
            <div class="back-content middle">
                <h2>{{name}}</h2>
                <br>
                <span>{{description}}</span>
                <div class="sm">
                    <a :href="url"><span><i class="fab fa-github"></i></span></a>
                    <a href="#"><i class="fab fa-twitter"></i></a>
                    <a href="https://www.youtube.com"><i class="fab fa-youtube"></i></a>
                    <a href="#"><i class="fab fa-instagram"></i></a>
                </div>
            </div>
        </div>
    </div>
</template>
<script>

    export default {
        name: "Person",
        props: {
            name: {
                type: String
            },
            image: {
                type: String
            },
            description: {
                type: String
            },
            url: {
                type: String
            }
        }
    }
</script>

<style scoped>
    link href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700%7CMaterial+Icons' rel="stylesheet" type="text/css"

*{
    margin: 0;
    padding: 0;
    text-decoration: none;
    font-family: "monofont";
}
    body{
        background: #fff0;
    }
    .middle {
        position: absolute;
        top:50%;
        left:50%;
        transform: translate(-50%, -50%);
    }
    .card{
        cursor: pointer;
        width: 100%;
        height: 100%;
        background-color: #fff0;
    }
    .front, .back {
        width: 100%;
        height: 100%;
        overflow: hidden;
        backface-visibility: hidden;
        position: absolute;
        transition: transform .6s linear;
        border-radius: 50%;
    }

    .front img{
        height: 100%;
        width: 100%;
    }
    .front {
        transform: perspective(600px) rotateY(0deg);
    }
    .back{
        background: #f1f1f1;
        transform: perspective(600px) rotateY(180deg);
        margin-left: 10%;
        width: 80%;
    }
    .back-content{
        color: #2c3e50;
        text-align: center;
        width: 100%;
    }
    .sm {
        margin: 20px 0;
    }
    .sm a{
        display: inline-flex;
        width: 40px;
        height: 40px;
        justify-content: center;
        align-items: center;
        color: #2c3e50;
        font-size: 18px;
        transition: 0.4s;
        border-radius: 50%
    }

    .sm a:hover{
        background: #E4BD5B;
        color: white;
    }
    .card:hover > .front{
        transform: perspective(600px) rotateY(-180deg);
    }
    .card:hover > .back{
        transform: perspective(600px) rotateY(0deg);
    }



</style>