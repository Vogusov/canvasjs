(function() {
        const canvas = document.createElement('canvas')

        let ctx = canvas.getContext('2d'),
            w = canvas.width = innerWidth,
            h = canvas.height = innerHeight,
            particles = [],
            properties = {
                bgColor: 'rgba(17, 17, 19, 1)',
                particleColor: 'rgba(255, 40, 40, 1)',
                particleRadius: 3,
                particleCount: 60,
                particleMaxVelocity: 1,
                lineLength: 150,
                particleLife: 6 // 6sec
            }

        document.querySelector('body').appendChild(canvas)

        window.onresize = function() {
            w = canvas.width = innerWidth
            h = canvas.height = innerHeight
        }

        class Particle {
            constructor() {
                this.x = Math.random() * w
                this.y = Math.random() * h
                this.velocityX = Math.random() * (properties.particleMaxVelocity * 2) - properties.particleMaxVelocity
                this.velocityY = Math.random() * (properties.particleMaxVelocity * 2) - properties.particleMaxVelocity
                this.life = Math.random() * properties.particleLife * 60 // 60fps
            }

            position() {
                ((this.x + this.velocityX > w && this.velocityX > 0) || (this.x + this.velocityX < 0 && this.velocityX < 0)) ? (this.velocityX *= -1) : this.velocityX;
                ((this.y + this.velocityY > h && this.velocityY > 0) || (this.y + this.velocityY < 0 && this.velocityY < 0)) ? this.velocityY *= -1 : this.velocityY;
                this.x += this.velocityX
                this.y += this.velocityY
            }

            reDraw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, properties.particleRadius, 0, Math.PI * 2)
                ctx.closePath()
                ctx.fillStyle = properties.particleColor
                ctx.fill()
            }

            recalculateLife(){
                if(this.life < 1){
                    this.x = Math.random() * w
                    this.y = Math.random() * h
                    this.velocityX = Math.random() * (properties.particleMaxVelocity * 2) - properties.particleMaxVelocity
                    this.velocityY = Math.random() * (properties.particleMaxVelocity * 2) - properties.particleMaxVelocity
                    this.life = Math.random() * properties.particleLife * 60 // 60fps
                }
                this.life--
            }
        }

        function drawLines(){
            let x1, y1, x2, y2, length, opacity;
            for(let i in particles){
                for (let j in particles){
                    x1 = particles[i].x
                    y1 = particles[i].y
                    x2 = particles[j].x
                    y2 = particles[j].y
                    length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2))
                    if(length < properties.lineLength){
                        opacity = 1 - length/properties.lineLength
                        // console.log(opacity)
                        ctx.lineWidth = 1
                        // ctx.strokeStyle = `rgba(255, 40, 40, ${opacity})`
                        ctx.strokeStyle = 'rgba(255, 40, 90, ' + opacity + ')'
                        ctx.moveTo(x1, y1)
                        ctx.lineTo(x2, y2)
                        ctx.closePath()
                        ctx.stroke()
                    }
                }
            }
        }

        function redrawParticles() {
            for (let i in particles) {
                particles[i].recalculateLife()
                particles[i].position()
                particles[i].reDraw()
            }
        }

        function reDrawBackground() {
            ctx.fillStyle = properties.bgColor
            ctx.fillRect(0, 0, w, h)
        }

        function loop() {
            reDrawBackground()
            redrawParticles()
            drawLines()
            requestAnimationFrame(loop)
        }

        function init() {
            for (let i = 0; i < properties.particleCount; i++) {
                particles.push(new Particle())
            }
            loop();
        }

        init()

    }()
)