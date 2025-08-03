# Bible-Themed Images Directory

This directory contains Bible-themed images for the quiz application. According to the instructions, beautiful Bible-themed images should be used throughout the site for hero sections, quiz cards, backgrounds, and navigation elements.

## Required Images

### Hero Section Images
- `hero-bible-study.jpg` - Main hero background image
- `bible-open.jpg` - Open Bible for study sections
- `ancient-scroll.jpg` - Ancient biblical scroll

### Quiz Category Images
- `old-testament.jpg` - Old Testament themed image
- `new-testament.jpg` - New Testament themed image
- `genesis-creation.jpg` - Creation scene for Genesis quizzes
- `jesus-teaching.jpg` - Jesus teaching for Gospel quizzes
- `moses-commandments.jpg` - Moses with commandments
- `david-psalms.jpg` - David with harp for Psalms

### Background Images
- `bible-background.jpg` - Subtle Bible background texture
- `scroll-pattern.jpg` - Ancient scroll pattern
- `cross-light.jpg` - Cross with divine light

### Icon Images
- `bible-icon.png` - Bible book icon
- `quiz-icon.png` - Quiz/question icon
- `study-icon.png` - Study guide icon

## Image Guidelines

1. **Format**: Use WebP for modern browsers with JPG fallbacks
2. **Size**: Optimize for web (under 200KB each)
3. **Dimensions**: 
   - Hero images: 1920x1080
   - Quiz cards: 400x300
   - Icons: 64x64, 128x128, 256x256
4. **Alt Text**: All images must have descriptive alt text
5. **Theme**: Biblical, respectful, educational, inspiring

## Usage Examples

```jsx
// Hero section
<Image 
  src="/images/hero-bible-study.jpg" 
  alt="Open Bible with warm lighting for study" 
  width={1920} 
  height={1080} 
/>

// Quiz card
<Image 
  src="/images/genesis-creation.jpg" 
  alt="Creation scene representing Genesis content" 
  width={400} 
  height={300} 
/>
```

## Placeholder Content

For development purposes, placeholder images are acceptable, but production should use high-quality, properly licensed Biblical imagery that enhances the educational experience.