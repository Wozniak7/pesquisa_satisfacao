import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

export default function App() {
  const [rating, setRating] = useState(null);

  const ratingsLabels = [
    { label: 'Ótimo', emoji: '😃' },
    { label: 'Bom', emoji: '🙂' },
    { label: 'Médio', emoji: '😐' },
    { label: 'Ruim', emoji: '😕' },
    { label: 'Péssimo', emoji: '😞' }
  ];

  const submitFeedback = async () => {
    try {
      const response = await fetch('http://localhost:3000/submit-feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ rating: ratingsLabels[rating].label }),
      });
      const data = await response.json();
      alert(data.message);
    } catch (error) {
      alert('Erro ao enviar feedback');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Qual o seu nível de satisfação com nosso atendimento?</Text>
      <Text style={styles.selectedRating}>
        {rating !== null ? `Você selecionou: ${ratingsLabels[rating].label}` : ''}
      </Text>
      <View style={styles.ratingContainer}>
        {ratingsLabels.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.button,
              { borderColor: rating === index ? '#1E90FF' : '#000' },
              rating === index && styles.selectedButton
            ]}
            onPress={() => setRating(index)}
          >
            <Text style={styles.buttonText}>
              {item.label} {item.emoji}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity style={styles.submitButton} onPress={submitFeedback}>
        <Text style={styles.submitButtonText}>Enviar Feedback</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#d3d3d3', 
  },
  title: {
    fontSize: 34,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#1E90FF',
  },
  selectedRating: {
    fontSize: 32,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#1E90FF',
  },
  ratingContainer: {
    flexDirection: 'column', 
    justifyContent: 'center',
    
  },
  button: {
    margin: 10,
    width: Dimensions.get('window').width / 4.5, 
    padding: 15,
    borderWidth: 2, 
    borderRadius: 5,
    backgroundColor: '#fff', 
    alignItems: 'center',
  },
  selectedButton: {
    backgroundColor: '#1E90FF', 
  },
  buttonText: {
    fontSize: 24,
    color: '#000', 
  },
  submitButton: {
    marginTop: 20,
    padding: 15,
    width: '500px',
    backgroundColor: '#1E90FF',
    borderRadius: 5,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 24,
    textAlign: 'center',
  },
});
